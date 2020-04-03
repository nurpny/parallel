import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';


// describe('<InvestorForm />', () => {
//   it('renders three <Foo /> components', () => {
//     const wrapper = shallow(<InvestorForm />);
//     expect(wrapper.find(Foo)).to.have.lengthOf(3);
//   });


//   it('renders an `.icon-star`', () => {
//     const wrapper = shallow(<InvestorForm />);
//     expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
//   });

//   it('renders children when passed in', () => {
//     const wrapper = shallow((
//       <InvestorForm>
//         <div className="unique" />
//       </InvestorForm>
//     ));
//     expect(wrapper.contains(<div className="unique" />)).to.equal(true);
//   });

//   it('simulates click events', () => {
//     const onButtonClick = sinon.spy();
//     const wrapper = shallow(<InvestorForm onButtonClick={onButtonClick} />);
//     wrapper.find('button').simulate('click');
//     expect(onButtonClick).to.have.property('callCount', 1);
//   });
// });
