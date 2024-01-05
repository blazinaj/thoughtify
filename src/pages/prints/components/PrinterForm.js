import {Printer} from "../../../models";
import {useForm} from "../../../utils/hooks/useForm";

export const PrinterForm = () => {

    const form = useForm({
        model: Printer,
        fieldConfig: {
            name: {
                label: "Name",
            },
            status: {
                label: "Status",
            },
            printModel: {
                label: "3D Model",
            },
            printer: {
                label: "Printer",
            },
            startTime: {
                label: "Start Time",
                inputType: "date"
            },
            endTime: {
                label: "End Time",
                inputType: "date"
            }
        }
    })

    return (
        form.display
    );
}