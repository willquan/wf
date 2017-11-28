export default {
    methods: {
        notify: function() {
            this.$Message.info(this.tip);
        }
    },
    data: function() {
        return {
            tip: 'hello world'
        }
    }
}