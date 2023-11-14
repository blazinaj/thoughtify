import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {SeoIllustration} from "../demo/assets";
import {UserContextProvider} from "../contexts/UserContext";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
          <ComponentPreview
            path="/SeoIllustration">
            <SeoIllustration/>
          </ComponentPreview>
          <ComponentPreview path="/UserContextProvider">
            <UserContextProvider/>
          </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;