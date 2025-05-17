import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {StreamGallery} from "./StreamGallery";
import {ThoughtGallery} from "../../thoughts/components/ThoughtGallery";
import {useDatastore} from "../../../utils/hooks/useDatastore";
import {Thought} from "../../../models";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function StreamTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const thoughts = useDatastore({
        model: Thought,
        enableSubscription: true,
    })

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Public" {...a11yProps(0)} />
                    <Tab label="Friends" {...a11yProps(1)} />
                    <Tab label="Favorites" {...a11yProps(2)} />
                    <Tab label="+ Create" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {/*<StreamGallery/>*/}
                <ThoughtGallery thoughts={thoughts.items} streamView={true}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <StreamGallery/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <StreamGallery/>
            </CustomTabPanel>
        </Box>
    );
}