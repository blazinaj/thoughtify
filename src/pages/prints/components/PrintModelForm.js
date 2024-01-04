import {useForm} from "../../../utils/hooks/useForm";
import {PrintModel} from "../../../models";

export const PrintModelForm = () => {

    //    estimatedPrintTime: Float
    //     estimatedVolume: Float
    //     estimatedCost: Float
    //     estimatedWeight: Float
    //     printSizeX: Float
    //     printSizeY: Float
    //     printSizeZ: Float
    //     filamentType: String
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

    const form = useForm({
        model: PrintModel,
        fieldConfig,
        typename: "PrintModel",
    })

    return form.display
}