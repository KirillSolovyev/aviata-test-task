import { shallowMount } from '@vue/test-utils';
import FixedBottomMenu from './FixedBottomMenu';

const wrapper = shallowMount(FixedBottomMenu, { propsData: { btnText: 'TEST TEXT' } });

describe('FixedBottomNenu component', () => {
	it('should render props', () => {
		expect(wrapper.find('.mobile-fixed-block__inner').text()).toContain('TEST TEXT');
	});

	it('should emit event on click', () => {
		const btn = wrapper.find('.mobile-fixed-block__btn');
		btn.trigger('click');
		expect(wrapper.emitted('btn:clicked')).toHaveLength(1);
	});
});