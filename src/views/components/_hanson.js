var data = getData();
var rowsCount = data.length;

var hot = Handsontable(document.getElementById('example'), {
  data: data,
  height: 456,
  colWidths: 100,
  minCols: 26,
  minRows: 100,
  rowHeaders: true,
  colHeaders: [
    'Task',
    'Owner',
    'Team',
    'Status',
    'Start date',
    'End date',
    'At risk',
    '% complete'
  ],
  columnSorting: true,
  filters: true,
  dropdownMenu: true,
  contextMenu: true,
  autoRowSize: true,
  manualColumnMove: true,
  manualRowMove: true,
  fillHandle: {
    autoInsertRow: true,
  },
  cells: function(row, column) {
    var cellMeta = {};

    if (row >= rowsCount) {
      return cellMeta;
    }

    if (column === 1) {
      cellMeta.type = 'dropdown';
      cellMeta.source = [
        'Ben',
        'Chris',
        'Jessica',
        'Kate',
        'Michael',
        'Monica',
        'Omar',
        'Paul',
        'Samuel',
      ];

    } else if (column === 2) {
      cellMeta.readOnly = true;
      cellMeta.type = 'text';
      cellMeta.renderer = function(hotInstance, TD, row, col, prop, value) {
        var colors = {
          Red: '#e87677',
          Green: '#66e100',
          Blue: '#00a7fe',
          Purple: '#6623e2',
          Orange: '#ffad24',
          Yellow: '#ffe300',
        };

        TD.style.color = colors[value];
        TD.textContent = value;
      };

    } else if (column === 3) {
      cellMeta.type = 'dropdown';
      cellMeta.source = [
        'New',
        'Accepted',
        'Rejected',
        'In progress',
        'Completed',
      ];

    } else if (column === 4 || column === 5) {
      cellMeta.type = 'date';
      cellMeta.dateFormat = 'DD/MM/YYYY';

    } else if (column === 6) {
      var isChecked = this.instance.getDataAtCell(this.instance.toVisualRow(row), column);

      cellMeta.type = 'checkbox';
      cellMeta.className = 'htCenter' + (isChecked ? ' at-risk-checked' : '');

    } else if (column === 7) {
      cellMeta.width = 110;
      cellMeta.renderer = function(hotInstance, TD, row, col, prop, value, cellProperties) {
        var progressBar = document.createElement('progress');

        value = parseInt(value, 10);

        progressBar.max = 100;
        progressBar.value = isNaN(value) ? 0 : value;

        TD.textContent = '';
        TD.appendChild(progressBar);
      };
    }

    return cellMeta;
  },
  // Create virtual column data ("Team" column)
  modifyData: function(row, column, valueHolder, ioMode) {
    if (this.toPhysicalColumn(column) === 2 && ioMode === 'get') {
      valueHolder.value = getOwnerTeam(this.getDataAtCell(this.toVisualRow(row), this.toVisualColumn(1)));
    }
  }
});

function getOwnerTeam(owner) {
  var teamOwners = {
    Red: ['Michael', 'Ben'],
    Green: ['Omar', 'Samuel'],
    Blue: ['Kate', 'Monica'],
    Purple: ['Chris'],
    Orange: ['Paul'],
    Yellow: ['Jessica'],
  };

  return Object.keys(teamOwners).reduce(function(acc, team) {
    return teamOwners[team].indexOf(owner) !== -1 ? team : acc;
  }, null);
}