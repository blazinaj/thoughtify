import * as React from "react";

/**
 * BiographySection component. Displays a section of the biography.
 * @param page - the page text
 * @param pageNumber - the page number
 * @returns {Element}
 * @constructor
 */
export const BiographySection = ({ page, pageNumber }) => {
    return (
        <span key={pageNumber}>
            <div className="demoPage">{page}</div>
            <hr style={{ marginBottom: '1em', marginTop: '1em' }} />
        </span>
    )
}