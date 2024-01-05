import {useForm} from "../../../utils/hooks/useForm";
import {Print, PrintModel} from "../../../models";
import {useEffect} from "react";
import {LinkedItemButton} from "../../../utils/components/LinkedItem";

export const PrintForm = ({item, printer, printModel}) => {
    const fieldConfig = {
        name: {
            label: "Name",
        },
        status: {
            label: "Status",
            defaultValue: "PREPARING"
        },
        printModel: {
            label: "3D Model",
            defaultValue: printModel?.id,
            inputType: "custom",
            customConfig: {
                component: (
                    <LinkedItemButton
                        model={PrintModel}
                        route={"/print-models"}
                        linkedItemIdField={"printModelId"}
                    />
                )
            }
        },
        printer: {
            label: "Printer",
            defaultValue: printer?.id,
        },
        startTime: {
            label: "Start Time",
            inputType: "date"
        },
        endTime: {
            label: "End Time",
            inputType: "date"
        },
    }

    const form = useForm({
        item,
        model: Print,
        fieldConfig,
        updateInputFunction: (input) => {
            if (input.startTime) {
                input.startTime = new Date(input.startTime).toISOString()
            }

            if (input.endTime) {
                input.endTime = new Date(input.endTime).toISOString()
            }

            return input;
        }
    })

    useEffect(() => {
        if (printer) {
            form.setInput(
                {
                    ...form.input,
                    printer: printer.id
                }
            )
        }

        if (printModel) {
            form.setInput(
                {
                    ...form.input,
                    printModel: printModel.id
                }
            )
        }


    }, [printer, printModel])

    return form.display
}