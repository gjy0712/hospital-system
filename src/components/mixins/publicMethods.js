// type ：success/warning/info/error
export const InfoMixins = {
    methods: {
        alertInfo(message, title = '错误', type = 'error') {
            this.$notify({
                title: title,
                message: message,
                type: type
            })
        }
    }
}
