import {useDetails} from "../../../utils/hooks/useDetails";
import {Print, Printer} from "../../../models";

export const PrintDetails = ({item}) => {

  const fieldConfig = {
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

  const details = useDetails({
    model: Print,
    item,
    fields: fieldConfig,
  })

  return (
    <div>
      {
        details.display
      }
    </div>
  );
}