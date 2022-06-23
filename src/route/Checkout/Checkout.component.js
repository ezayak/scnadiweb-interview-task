import {
    Checkout as SourceCheckout,
} from 'SourceRoute/Checkout/Checkout.component';
import {
    DETAILS_STEP
} from 'SourceRoute/Checkout/Checkout.config';
import ContentWrapper from 'Component/ContentWrapper';
import ProgressBar from 'Component/ProgressBar';

export class Checkout extends SourceCheckout {
    // TODO implement logic
    checkStepsAsMarked = (stepList) => {
        for (const stepKey in stepList) {
            stepList[stepKey].marked = true;
        }
    }

    renderProgressBar() {
        const { checkoutStep } = this.props;
        let index = 0;
        let currentStep = 0;
        const stepList = {};
        
        for (const key in this.stepMap) {
            if (key !== DETAILS_STEP) {
                if (key === checkoutStep) {
                    this.checkStepsAsMarked(stepList);
                }

                const step = this.stepMap[key];
                currentStep = key === this.checkoutStep ? index : currentStep;
                index++;
    
                stepList[key] = {
                    title: step.title,
                    marked: false,
                    isCurrentStep: key === checkoutStep,
                    index: index,
                    id: key
                };
            } else {
                if (key === checkoutStep) {
                    this.checkStepsAsMarked(stepList);
                }
            }
        }

        console.log('stepList', stepList);

        return (
             <ProgressBar stepList={ stepList } currentStep={ currentStep }/>
        );
    }

    render() {
        return (
            <main block="Checkout">
                { this.renderProgressBar() }
                <ContentWrapper
                    wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                    label={ __('Checkout page') }
                    >
                        
                        { this.renderSummary(true) }
                        <div block="Checkout" elem="Step">
                            { this.renderTitle() }
                            { this.renderGuestForm() }
                            { this.renderStep() }
                            { this.renderLoader() }
                        </div>
                        <div>
                            { this.renderSummary() }
                            { this.renderPromo() }
                            { this.renderCoupon() }
                        </div>
                </ContentWrapper>
            </main>
        );
    }    
};

export default Checkout;
