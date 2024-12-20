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

  return (
    <>
      {gettingResults ? (
        <TrullySdkWeb
          configuration={{
            isDev: true,
            apiKey: "YOUR_API_KEY",
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
            src="https://trully-api-documentation.s3.amazonaws.com/trully-sdk/logo-trully-unico.webp"
            alt="logo"
            className="trully-logo"
          />
          <div className="trully-data">
            <div className="images-container">
              <div className="image">
                <h4 className="trully-text-1-bold">Frente recortado</h4>
                <img
                  src={`data:image/png;base64,${
                    response?.document_image ?? "./card.png"
                  }`}
                  className="trully-id"
                  alt="icon"
                />
              </div>
              <div className="image">
                <h4 className="trully-text-1-bold">Frente completo</h4>
                <img
                  src={`data:image/png;base64,${
                    response?.document_image_complete ?? "./card.png"
                  }`}
                  className="trully-id"
                  alt="icon"
                />
              </div>
              <div className="image">
                <h4 className="trully-text-1-bold">Dorso recortado</h4>
                <img
                  src={`data:image/png;base64,${
                    response?.document_back ?? "./card.png"
                  }`}
                  className="trully-id"
                  alt="icon"
                />
              </div>
              <div className="image">
                <h4 className="trully-text-1-bold">Dorso completo</h4>
                <img
                  src={`data:image/png;base64,${
                    response?.document_back_complete ?? "./card.png"
                  }`}
                  className="trully-id"
                  alt="icon"
                />
              </div>
              <div className="image">
                <h4 className="trully-text-1-bold">Selfie</h4>
                <img
                  src={`data:image/png;base64,${
                    response?.image ?? "./card.png"
                  }`}
                  className="trully-id"
                  alt="icon"
                />
              </div>
            </div>
            <div className="info-container">
              <h4 className="trully-text-1-bold">Label:</h4>
              <span
                className={`${setLabelColor(
                  response?.label?.toLowerCase()
                )} trully-text-1-bold`}
              >
                {response?.label ?? "No encontrado"}
              </span>
            </div>
            <button
              className="trully-button trully-button-text"
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
