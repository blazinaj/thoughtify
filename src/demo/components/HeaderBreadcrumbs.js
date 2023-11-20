import { isString } from 'lodash';
import PropTypes from 'prop-types';
// material
import { Box, Typography, Link } from '@mui/material';
//
import { MBreadcrumbs } from './@material-extend';
import {getIcon} from "../../utils/functions/getIcon";

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object
};

export default function HeaderBreadcrumbs({ icon, links = [], action, heading, subHeading, moreLink = '' || [], sx, ...other }) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            <Box
              component="flex"
              alignContent={"bottom"}
              justifyContent={"bottom"}
              sx={{
                marginRight: "0.5em",
                paddingTop: "0.5em",
              }}
            >
              {
                icon && (
                  getIcon(icon)
                )
              }
            </Box>
            {heading}
          </Typography>
          {
            subHeading && (
              <Typography variant="body2" gutterBottom>
                {subHeading}
              </Typography>
            )
          }
          <MBreadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link noWrap key={href} href={href} variant="body2" target="_blank" sx={{ display: 'table' }}>
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
