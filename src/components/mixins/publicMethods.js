// type ：success/warning/info/error
export const InfoMixins = {
    methods: {
        alertInfo(message, title = this.$t('public.error'), type = 'error') {
            this.$notify({
                title: title,
                message: message,
                type: type
            })
        }
    }
}
