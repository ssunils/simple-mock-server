import React from "react";
import AceEditor from "react-ace";

// Import Ace Editor modes, themes, and extensions
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

// Define the props interface
interface JSONEditorProps {
    value?: string; // Initial JSON value
    onChange?: (newValue: string) => void; // Callback for value changes
    height?: string; // Height of the editor
    width?: string; // Width of the editor
    fontSize?: number; // Font size
}

const JSONEditor: React.FC<JSONEditorProps> = ({
    value = `{}`,
    onChange,
    height = "400px",
    width = "100%",
    fontSize = 14,
}) => {
    const handleEditorChange = (newValue: string) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <AceEditor
            mode="json" // Set the mode to JSON
            theme="github" // Use the GitHub theme
            onChange={handleEditorChange} // Handle changes
            name="JSON_EDITOR_UNIQUE_ID" // Provide a unique ID for the editor instance
            editorProps={{ $blockScrolling: true }} // Avoid warnings
            width={width} // Set width
            height={height} // Set height
            fontSize={fontSize} // Set font size
            showPrintMargin={true} // Show print margin
            showGutter={true} // Show line numbers
            highlightActiveLine={true} // Highlight the active line
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                useWorker: false
            }}
            value={value} // Set default or passed JSON value
        />
    );
};

export default JSONEditor;
