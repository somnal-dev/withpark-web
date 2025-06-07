import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Select from './index';
import type { SelectOption } from './index';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const options: SelectOption[] = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
  { value: 'gyeonggi', label: '경기', disabled: true },
];

export const Default: Story = {
  args: {
    options,
    placeholder: '지역을 선택하세요',
  },
};

export const WithLabel: Story = {
  args: {
    options,
    label: '지역 선택',
    placeholder: '지역을 선택하세요',
  },
};

export const Required: Story = {
  args: {
    options,
    label: '지역 선택',
    placeholder: '지역을 선택하세요',
    required: true,
  },
};

export const Small: Story = {
  args: {
    options,
    label: '지역 선택',
    placeholder: '지역을 선택하세요',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    options,
    label: '지역 선택',
    placeholder: '지역을 선택하세요',
    size: 'large',
  },
};

export const FullWidth: Story = {
  args: {
    options,
    label: '지역 선택',
    placeholder: '지역을 선택하세요',
    fullWidth: true,
  },
};

export const WithError: Story = {
  args: {
    options,
    label: '지역 선택',
    placeholder: '지역을 선택하세요',
    error: true,
    errorMessage: '지역을 선택해주세요.',
  },
};

export const WithHelpText: Story = {
  args: {
    options,
    label: '지역 선택',
    placeholder: '지역을 선택하세요',
    helpText: '거주하고 계신 지역을 선택해주세요.',
  },
};

export const Disabled: Story = {
  args: {
    options,
    label: '지역 선택',
    placeholder: '지역을 선택하세요',
    disabled: true,
  },
};

// 인터랙티브 예제
export const Interactive: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string | number>('');
    
    return (
      <div style={{ width: '300px' }}>
        <Select
          options={options}
          label="지역 선택"
          placeholder="지역을 선택하세요"
          value={selectedValue}
          onChange={(value, option) => {
            setSelectedValue(value);
            console.log('선택된 값:', value, option);
          }}
          helpText="선택한 값이 콘솔에 출력됩니다."
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          선택된 값: {selectedValue || '없음'}
        </div>
      </div>
    );
  },
};

// 다양한 옵션 타입
export const MixedOptions: Story = {
  args: {
    options: [
      { value: 1, label: '첫 번째 (숫자)' },
      { value: 'second', label: '두 번째 (문자열)' },
      { value: 3, label: '세 번째 (숫자)', disabled: true },
      { value: 'fourth', label: '네 번째 (문자열)' },
    ],
    label: '혼합 옵션',
    placeholder: '옵션을 선택하세요',
  },
}; 