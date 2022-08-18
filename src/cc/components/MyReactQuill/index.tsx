import { Form } from 'antd';
import type { FormItemProps } from 'antd/es/form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

export const MyReactQuill = (props: FormItemProps) => {
  return (
    <Form.Item label={props.label} name={props.name}>
      <ReactQuill theme="snow" modules={modules} formats={formats} />
    </Form.Item>
  );
};
