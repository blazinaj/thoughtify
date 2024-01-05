import {useForm} from "../../../utils/hooks/useForm";
import {PrintModel} from "../../../models";

export const PrintModelForm = ({item}) => {

    const fieldConfig = {
        name: {
            label: "Name",
            type: "text",
            required: true,
        },
        estimatedPrintTime: {
            label: "Estimated Print Time (Hours)",
            inputType: "number",
        },
        estimatedVolume: {
            label: "Estimated Volume (mm^3)",
            inputType: "number",
        },
        estimatedWeight: {
            label: "Estimated Weight (g)",
            inputType: "number",
        },
        printSizeX: {
            label: "Print Size X (mm)",
            inputType: "number",
        },
        printSizeY: {
            label: "Print Size Y (mm)",
            inputType: "number",
        },
        printSizeZ: {
            label: "Print Size Z (mm)",
            inputType: "number",
        },
        filamentType: {
            label: "Filament Type",
            defaultValue: "PLA"
        }

    }

    const updateInputFunction = (input) => {
        if (input.startTime) {
            input.startTime = new Date(input.startTime).toISOString()
        }

        if (input.endTime) {
            input.endTime = new Date(input.endTime).toISOString()
        }

        if (input.estimatedVolume) {
            input.estimatedVolume = Number(input.estimatedVolume)
        }

        if (input.estimatedWeight) {
            input.estimatedWeight = Number(input.estimatedWeight)
        }

        return input;
    }

    const form = useForm({
       item,
        model: PrintModel,
        fieldConfig,
        typename: "PrintModel",
        updateInputFunction,
    })

    return form.display
}