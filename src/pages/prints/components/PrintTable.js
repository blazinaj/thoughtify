import {useDataTable} from "../../../utils/hooks/useDataTable";
import {Print, PrintModel} from "../../../models";
import {PrintModelDetails} from "./PrintModelDetails";
import {useDataCard} from "../../../utils/hooks/useDataCard";
import {PrintForm} from "./PrintForm";

export const PrintTable = ({printer, printModel}) => {

  const getPredicate = () => {
    if (printer && printModel) {
      return (print) => print.or((print) => [
        (print) => print.printer.id.eq(printer.id),
        (print) => print.printModel.id.eq(printModel.id)
      ])
    }
    if (printer) {
      return (printModel) => printModel.printer.id.eq(printer.id)
    }
    if (printModel) {
        return (print) => print.printModel.id.eq(printModel.id)
    }
    return undefined
  }

  const getRoute = () => {
    if (printer && printModel) {
      return `/prints/?printer=${printer.id}&printModel=${printModel.id}`
    }
    if (printer) {
      return `/printers/${printer.id}/prints/`
    }
    if (printModel) {
      return `/print-models/${printModel.id}/prints/`
    }
    return `/prints/`
  }

  const columns = [
    {
        field: 'name',
        headerName: 'Name',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
        width: 150
    },
    {
      field: "startTime",
        headerName: "Start Time",
      type: "date",
    },
    {
        field: "endTime",
        headerName: "End Time",
        type: "date",
    }
  ]



  const table = useDataCard({
    model: Print,
    predicate: getPredicate(),
    columns,
    title: "Prints",
    formComponent: <PrintForm printer={printer} printModel={printModel}/>,
    route: getRoute(),
  })

  return (
    <div>
        {
          table.display
        }
    </div>
  );
}