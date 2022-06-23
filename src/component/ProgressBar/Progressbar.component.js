//import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './Progressbar.style.scss';

class Progressbar extends PureComponent {
    renderElement(step) {
        const { title, marked, index, id, isCurrentStep } = step;
        const className = marked || isCurrentStep ? 'active' : '';

        return (
            <div className='step-container'>
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
        console.log(stepList);

        return (
            <div class="progress-container">
                { stepList.map(step => {
                    return this.renderElement(step);
                }) }
            </div>
        );
    }

    calculateWidth = () => {
        const { stepList } = this.props;
        const listLength = Object.keys(stepList).length;
        const markedSteps = Object.keys(stepList).filter(key => {
            return stepList[key].marked || stepList[key].isCurrentStep;
        }).length;

        const length = 25 + (listLength !== 0 ? 50 * markedSteps / listLength : 0);
        console.log('length', length);
        console.log('length', markedSteps);
        console.log('length', listLength);
        return `calc(${length}% + 30px)`;
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