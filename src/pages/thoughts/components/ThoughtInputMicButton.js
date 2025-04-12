import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import micFill from '@iconify/icons-eva/mic-fill';

export const ThoughtInputMicButton = ({ disabled, toggleListening, listening }) => {
  return (
    <IconButton disabled={disabled} size="small" onClick={toggleListening}>
      {listening ? (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <rect width={2.8} height={12} x={1} y={6} fill="currentColor">
            <animate
              id="svgSpinnersBarsScale0"
              attributeName="y"
              begin="0;svgSpinnersBarsScale1.end-0.17s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="6;1;6"
            />
            <animate
              attributeName="height"
              begin="0;svgSpinnersBarsScale1.end-0.17s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="12;22;12"
            />
          </rect>
          <rect width={2.8} height={12} x={5.8} y={6} fill="currentColor">
            <animate
              attributeName="y"
              begin="svgSpinnersBarsScale0.begin+0.17s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="6;1;6"
            />
            <animate
              attributeName="height"
              begin="svgSpinnersBarsScale0.begin+0.17s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="12;22;12"
            />
          </rect>
          <rect width={2.8} height={12} x={10.6} y={6} fill="currentColor">
            <animate
              attributeName="y"
              begin="svgSpinnersBarsScale0.begin+0.34s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="6;1;6"
            />
            <animate
              attributeName="height"
              begin="svgSpinnersBarsScale0.begin+0.34s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="12;22;12"
            />
          </rect>
          <rect width={2.8} height={12} x={15.4} y={6} fill="currentColor">
            <animate
              attributeName="y"
              begin="svgSpinnersBarsScale0.begin+0.51s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="6;1;6"
            />
            <animate
              attributeName="height"
              begin="svgSpinnersBarsScale0.begin+0.51s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="12;22;12"
            />
          </rect>
          <rect width={2.8} height={12} x={20.2} y={6} fill="currentColor">
            <animate
              id="svgSpinnersBarsScale1"
              attributeName="y"
              begin="svgSpinnersBarsScale0.begin+0.68s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="6;1;6"
            />
            <animate
              attributeName="height"
              begin="svgSpinnersBarsScale0.begin+0.68s"
              calcMode="spline"
              dur="1.02s"
              keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
              values="12;22;12"
            />
          </rect>
        </svg>
      ) : (
        <Icon icon={micFill} width={24} height={24} />
      )}
    </IconButton>
  );
};
