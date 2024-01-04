import {useDataTable} from "../../../utils/hooks/useDataTable";
import {PrintModel} from "../../../models";
import {PrintModelDetails} from "./PrintModelDetails";
import {useDataCard} from "../../../utils/hooks/useDataCard";
import {PrintModelForm} from "./PrintModelForm";

export const PrintModelTable = () => {

  const columns = [
    {
      field: "name",
        headerName: "Name",
        width: 300
    },
    {
        field: "estimatedPrintTime",
        headerName: "Estimated Print Time (Hours)",
        width: 300
    },
    {
        field: "estimatedVolume",
        headerName: "Estimated Volume (mm^3)",
        width: 300
    },
    {
        field: "estimatedWeight",
        headerName: "Estimated Weight (g)",
        width: 300
    },
    {
      estimatedCost: "estimatedCost",
        headerName: "Estimated Cost",
        width: 300
    },
  ]

  const table = useDataCard({
    model: PrintModel,
    detailsComponent: <PrintModelDetails/>,
    typename: "PrintModel",
    title: "3D Models",
    route: "/print-models/",
    formComponent: <PrintModelForm/>,
    columns
  })

  return (
    <div>
      {
        table.display
      }
    </div>
  );
}