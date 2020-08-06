import { shallowMount } from '@vue/test-utils';
import FilterBlock from './FilterBlock';

const wrapperGen = (props) => shallowMount(FilterBlock, { propsData: props });

describe('FilterBlock component', () => {
	it('should be rendered with props', () => {
		const wrapper = wrapperGen({
			title: 'Test title'
		});
		const title = wrapper.find('.filter-block__title');
		const btn = wrapper.find('.clear-filter');
		expect(title.text()).toContain('Test title');
		expect(btn.exists()).toBe(false);
	});

	it('should render clear button and emit event on click', () => {
		const wrapper = wrapperGen({
			title: 'Test title',
			hasSelect: true
		});
		const btn = wrapper.find('.clear-filter');
		btn.trigger('click');

		expect(btn.exists()).toBe(true);
		expect(wrapper.emitted('filter:clear')).toHaveLength(1);
	});
});