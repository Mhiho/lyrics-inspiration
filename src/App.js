import "./App.css";
import { useRef, useState } from "react";
import { tryAI } from "./AI/engine";

export default function App() {
  const [write, setWrite] = useState(false);
  const [term, setTerm] = useState("");
  const [propos, setPropos] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const inputLyric = useRef("");
  const inputPropo = useRef("");

  const sectionHandler = (e) => {
    e.preventDefault();
    setLyrics((lyrics) => [...lyrics, inputLyric.current]);
    e.target.reset();
  };
  const resetHandler = () => {
    setPropos([]);
  };
  const handleSubmit = async (e, input) => {
    e.preventDefault();
    const proposition = await tryAI(input);
    setPropos((propos) => [...propos, proposition]);
    e.target.reset();
  };

  return (
    <div className="App">
      <header onClick={() => setWrite(true)} className="App-header">
        <div className="container" onClick={() => setWrite(true)}>
          <div className="row own-row">
            {write ? (
              <>
                <section className="col">
                  <div>
                    <form
                      className="form-group"
                      onSubmit={(section) => sectionHandler(section)}
                    >
                      <h3>
                        <label>Your lyrics:</label>
                      </h3>
                      <input
                        className="form-control"
                        type="text"
                        ref={inputLyric}
                        placeholder="Type here"
                        onChange={(e) => (inputLyric.current = e.target.value)}
                      />
                      <button className="btn btn-primary" type="submit">
                        Add Row
                      </button>
                    </form>
                    {lyrics.map((section, index) => {
                      return (
                        <h5 className="lyric-row" key={`lyrics-${index}`}>
                          {index + 1}. {section}
                        </h5>
                      );
                    })}
                  </div>
                </section>
                <section className="col">
                  <div>
                    <form
                      className="form-group"
                      onSubmit={(e) => handleSubmit(e, term)}
                    >
                      <h3>
                        <label>Your inspirations:</label>
                      </h3>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Some words to get inspiration"
                        onChange={(e) => (inputPropo.current = e.target.value)}
                      />
                      <button className="btn btn-success" type="submit">
                        Davinci Inspire Me
                      </button>
                      <button
                        onClick={resetHandler}
                        className="btn btn-danger m-1"
                      >
                        Reset inspirations
                      </button>
                    </form>
                    {propos.map((propo, index) => (
                      <h6 className="inspiration" key={`propositions-${index}`}>
                        {propo}
                      </h6>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <div className="row">
                <h1>Writing Machine</h1>
                <h3>(click on page to start)</h3>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
