import {useDataTable} from "../../../utils/hooks/useDataTable";
import {Printer} from "../../../models";
import {PrinterDetails} from "./PrinterDetails";
import {useDataCard} from "../../../utils/hooks/useDataCard";
import {PrinterForm} from "./PrinterForm";

export const PrinterTable = () => {

  const columns = [
    {
      field: 'name',
      width: 300
    },
    {
      field: 'status',
      width: 300
    }
  ]

  const table = useDataCard({
    model: Printer,
    typename: "Printer",
    detailsComponent: <PrinterDetails/>,
    formComponent: <PrinterForm/>,
    columns,
    route: `/printers/`,
  })

  return (
    <>
      {
        table.display
      }
    </>
  );
}