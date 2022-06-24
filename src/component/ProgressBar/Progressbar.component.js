//import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './Progressbar.style.scss';

class Progressbar extends PureComponent {
    renderElement(step, stepWidth) {
        const { title, marked, index, id, isCurrentStep } = step;
        const className = marked || isCurrentStep ? 'active' : '';
        const stepContainerStyle = {
            width: `${stepWidth}%`
        }

        return (
            <div className='step-container' style={ stepContainerStyle }>
                <div className={`circle ${className}`} key={ id }>
                    { marked ? <span> &#10003; </span> : <span>{ index }</span> }
                </div>
                <div className='progress-title'> 
                    { title }
                </div>
            </div>
        );
    }

    renderList() {
        const stepList = Object.keys(this.props.stepList).map(key => this.props.stepList[key]);
        const stepWidth = stepList.length !== 0 ? 100 / stepList.length : 0;

        return (
            <div class="progress-container">
                { stepList.map(step => {
                    return this.renderElement(step, stepWidth);
                }) }
            </div>
        );
    }

    calculateWidth = () => {
        const { stepList } = this.props;
        const listLength = Object.keys(stepList).length;

        if (listLength === 0) {
            return 0;
        }

        let markedSteps = 0;
        let currentStepIndex = 0;

        for (const key in stepList) {
            const step = stepList[key];
            markedSteps = markedSteps + (step.marked ? 1 : 0);

            if (step.isCurrentStep) {
                currentStepIndex = step.index - 1;
            }
        }

        const left = 25 + 25 /listLength;
        const right = markedSteps === listLength ? left : 0;
        currentStepIndex = listLength === markedSteps ? listLength - 1 : currentStepIndex;
        const widthStep = 50 / listLength;
        const length = left + widthStep * currentStepIndex + right;
        return `calc(${length}%)`;
    }

    render() {
        const progressLineStyle = {
            width: this.calculateWidth()
        };

        return (
            <div className='progressbar-container'>
                <div class="progress" style={progressLineStyle}></div>
                { this.renderList() }
            </div>
        );
    }
}

export default Progressbar;