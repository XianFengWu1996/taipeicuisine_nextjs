interface ISettingState {
    show_login_dialog: boolean,
    show_sms_dialog: boolean,

    show_customer_card: boolean,
    show_address_card: boolean,

    show_checkout_skeleton: boolean,
    allow_payment_page: boolean,
}  


interface IPersistSetting {
    language: string,
    theme_mode: ThemeMode
}  

type ThemeMode = 'light' | 'dark'
