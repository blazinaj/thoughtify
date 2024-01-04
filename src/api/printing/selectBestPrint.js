/**
 * Uses AI to select the best print from a list of printModels for a printer, based on the
 * printer's capabilities, previous prints, and the printModels properties.
 * @param printer
 * @returns {Promise<void>}
 */
export const selectBestPrint = async ({
  printer,
}) => {

  const prints = await printer.prints.toArray();


}