import { Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'
import useStyles from '../../Utils/styles';

export default function CheckoutDisplay({activeStep=0}) {
  const style = useStyles();
  return (
    <Stepper className={style.transparentBackground} activeStep={activeStep} alternativeLabel>
      {
        ['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(step =>
          (
             <Step key={step}>
               <StepLabel>{step}</StepLabel>
               </Step>
          ))
      }

    </Stepper>
  );
}
