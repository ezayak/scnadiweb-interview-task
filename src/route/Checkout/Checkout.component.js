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
    renderProgressBar() {
        const { checkoutStep } = this.props;
        let prevStepsMakred = false;
        let index = 0;
        let currentStep = 0;
        const stepList = {};
        
        for (const key in this.stepMap) {
            if (key !== DETAILS_STEP) {
                console.log('key', key);
                console.log('this.checkoutStep', checkoutStep);

                const stepMarked = prevStepsMakred || key === checkoutStep;
                const step = this.stepMap[key];
                prevStepsMakred = prevStepsMakred || stepMarked;
                currentStep = key === this.checkoutStep ? index : currentStep;
                index++;
    
                stepList[key] = {
                    title: step.title,
                    marked: stepMarked,
                    index: index
                };
            }
        }

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
