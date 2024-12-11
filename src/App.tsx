import { SDKResponse, TrullySdkWeb } from "@trully/trully-sdk-react";
import { useState } from "react";

function App() {
  const [gettingResults, setGettingResults] = useState(true);
  const [response, setResponse] = useState<SDKResponse | null>(null);

  const setLabelColor = (label?: string) => {
    switch (label) {
      case "potential threat":
        return "red";
      case "review":
        return "yellow";
      case "no threat":
        return "green";
      default:
        return "";
    }
  };

  const getImageUrl = (base64?: string) => {
    if (!base64) return null;

    const byteString = atob(base64 as string);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uintArray], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  return (
    <>
      {gettingResults ? (
        <TrullySdkWeb
          configuration={{
            isDev: true,
            apiKey: "YOU_API_KEY",
            user_id: "YOUR_USER_ID",
            handleData: (response) => {
              setGettingResults(() => {
                setResponse(response);
                return false;
              });
            },
            handleError: (error) => {
              console.log(error);
            },
          }}
        />
      ) : (
        <div className="trully-container trully-response">
          <img
            src="https://trully-api-documentation.s3.amazonaws.com/trully-sdk/logo-trully-unico.svg"
            alt="logo"
            className="trully-logo"
          />
          <div className="trully-data">
            <div className="images-container">
              <div className="image">
                <h4>Frente recortado</h4>
                <img
                  src={getImageUrl(response?.document_image) ?? "./card.png"}
                  className="trully-id"
                  alt="icon"
                />
              </div>
              <div className="image">
                <h4>Frente completo</h4>
                <img
                  src={
                    getImageUrl(response?.document_image_complete) ??
                    "./card.png"
                  }
                  className="trully-id"
                  alt="icon"
                />
              </div>
              <div className="image">
                <h4>Dorso recortado</h4>
                <img
                  src={getImageUrl(response?.document_back) ?? "./card.png"}
                  className="trully-id"
                  alt="icon"
                />
              </div>
              <div className="image">
                <h4>Dorso completo</h4>
                <img
                  src={
                    getImageUrl(response?.document_back_complete) ??
                    "./card.png"
                  }
                  className="trully-id"
                  alt="icon"
                />
              </div>
              <div className="image">
                <h4>Selfie</h4>
                <img
                  src={getImageUrl(response?.image) ?? "./card.png"}
                  className="trully-id"
                  alt="icon"
                />
              </div>
            </div>
            <div className="info-container">
              <div>
                <h4>Label</h4>
                <span
                  className={`${setLabelColor(
                    response?.label?.toLowerCase()
                  )} trully-text`}
                >
                  {response?.label ?? "No encontrado"}
                </span>
              </div>
            </div>
            <button
              className="trully-button trully-text"
              onClick={() => {
                setGettingResults(() => {
                  setResponse(null);
                  return true;
                });
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
