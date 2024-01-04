import {useDataTable} from "../../../utils/hooks/useDataTable";
import {PrintModel} from "../../../models";
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
      return `/print-model/:printModelId/:id${printModel.id}`
    }
    return `/prints/`
  }

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
    model: PrintModel,
    detailsComponent: <PrintModelDetails/>,
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