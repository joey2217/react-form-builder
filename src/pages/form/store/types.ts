import {
  Input,
  InputProps,
  FormItemProps,
  FormProps,
  Select,
  SelectProps,
} from 'antd'
import { EditOutlined } from '@ant-design/icons'

export type FormComponent = typeof Input | typeof Select
export type ComponentProps = InputProps | SelectProps<any>

export type FormComponentName = 'Input' | 'Select'
// 组件map
export const compMap = new Map<FormComponentName, any>([
  ['Input', Input],
  ['Select', Select],
])
export const iconMap = new Map<string, React.ForwardRefExoticComponent<{}>>([
  ['Input', EditOutlined],
  ['Select', EditOutlined],
])

interface Option {
  label: string
  value: string
}

export interface CompProps {
  label: string
  icon: string
  defaultValue: string
  formItemProps: FormItemProps
  componentName: FormComponentName
  componentProps?: ComponentProps
  options?: Option[]
}

export interface CompData extends CompProps {
  key: string
  name: string
}

export const DROP_TYPE = 'form_type'

export const ruleTypes = ['string', 'number', 'url', 'email']

export interface ExtraFormProps {
  showSubmitButton: boolean
  formTitle: string
  id?: number //for db
  createAt?: number //for db
}

const commonFormProps: FormItemProps = {
  rules: [
    {
      required: false,
      message: '',
    },
  ],
}

export const formCompList: CompProps[] = [
  {
    label: 'Input',
    defaultValue: '',
    icon: 'Input',
    formItemProps: commonFormProps,
    componentName: 'Input',
    componentProps: {
      placeholder: 'Input',
      allowClear: false,
    },
  },
  {
    label: 'Select',
    defaultValue: '',
    icon: 'Select',
    formItemProps: commonFormProps,
    componentName: 'Select',
    componentProps: {
      placeholder: 'Select',
      allowClear: false,
    },
    options: [],
  },
]

export interface FormData {
  formData: CompData[]
  formProps: FormProps & ExtraFormProps
}

export interface DBFormData {
  id?: number
  name: string
  createAt: number
  updateAt: number
  compList: CompData[]
  props: FormProps
  extra: ExtraFormProps
}
