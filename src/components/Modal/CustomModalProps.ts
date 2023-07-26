interface CustomModalProps {
    title: string
    open: boolean
    children: any
    footer: boolean
    close: React.Dispatch<React.SetStateAction<boolean>>
}

export default CustomModalProps;