import Input from "./Input";
import { TypedProvider } from "./TypedProvider";
import Typing from "./Typing";
import TypeSheet from "./TypeSheet";
import Result from "./Result";

function Steno() {
  return (
    <>
      <TypedProvider>
        <div
          style={{
            position: "sticky",
            top: "2rem",
          }}
        >
          <Input />
          <div
            style={{
              position: "relative",
              top: 0,
            }}
          >
            <TypeSheet />
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  top: 0,
                }}
              >
                <Typing />
              </div>
            </div>
          </div>
        </div>
        <Result />
      </TypedProvider>
    </>
  );
}

export default Steno;
