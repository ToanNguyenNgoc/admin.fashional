import { FC, useEffect, useRef, useState } from "react"

interface FCkEditorProps {
  value?: string;
  onChange?: (e: string) => void
}

export const FCkEditor: FC<FCkEditorProps> = ({ value = '', onChange = () => { } }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <Editor
      value={value}
      name="description"
      onChange={(data: any) => onChange(data)}
      editorLoaded={editorLoaded}
    />
  )
}

const Editor = ({ onChange, editorLoaded, name, value }: any) => {
  const editorRef = useRef<any>();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  )
}