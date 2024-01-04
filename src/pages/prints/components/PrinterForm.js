import {Printer} from "../../../models";
import {useForm} from "../../../utils/hooks/useForm";

export const PrinterForm = () => {

    const form = useForm({
        model: Printer,
        fieldConfig: {
            name: {
                label: "Name",
                type: "text",
                required: true,
            },
        }
    })

    return (
        form.display
    );
}