import { useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '/src/App.css';
import { LuPlay, LuSearch } from "react-icons/lu";
import Search from "/src/components/SearchBar";
import Footer from '/src/components/footer';
import { CgClose } from "react-icons/cg";

function PlayerPage() {
  const {id, type} = useParams();
  const [moviesDetails, setMoviesDetails] = useState([]);
  const apiKey = "df087968ddf338b4ac0f9876af17f739";
  const apiURL = 'https://api.themoviedb.org/3/';
  const [autorizado, setAutorizado] = useState(false);
  const navigate = useNavigate();
  const headerContainer = useRef();
  const [playerAtivo, setPlayerAtivo] = useState('desativado');
  const [imgUrl, setImgUrl] = useState("https://image.tmdb.org/t/p/original");
  const [btnAtivo, setBtnAtivo] = useState('btnDesativado');
  const [hideBar, setHideBar] = useState(true);
  const AppRef = useRef();
  const handleClick = () => {
    setPlayerAtivo('player-ativo')
  }

  const btnClick = () => {
    if (btnAtivo === 'btnDesativado'){
      setBtnAtivo('btnAtivo')
    }else{
      setBtnAtivo('btnDesativado')
    }
  }

  const btnNavigate = (e) => {
    console.log(e);
    navigate(`/${e.target.id}`)
  }

  const HandleHideChange = (newValue) => {
    setHideBar(newValue);
    AppRef.current.style.opacity = '0';
    AppRef.current.style.zIndex = '-200';
  }

  const hideBarSearch = () => {
    if (hideBar === true) {
      setBtnAtivo('desativado');
      setHideBar(false);
    AppRef.current.style.opacity = '.9';
    AppRef.current.style.zIndex = '100';
    }
  }

  const handleReleaseDate = (date) => {
    const newDate = [];
    for (let i = 0; i < 4; i++){
      newDate.push(date[i]);
    } 
    return newDate;
  }

  const handleGenres = (object) => {
    const genres = [];
    for (let genre in object){
      genres.push(object[genre].name);
    }
    return genres;
  }

  const handleRunTime = (runtime) => {
    let hours = 0;
    let minites = 0;
    const time = [];

    if (runtime >= 60){
      hours = parseInt(runtime / 60);
      minites = parseInt(runtime - (hours * 60));
      time.push(hours, minites);
    }else{
      minites = runtime;
      time.push(hours, minites);
    }

    return time;
  }

  useEffect(() => {
    const Delay = setTimeout(() => {
      setAutorizado(true);
    }, 2000)

    const fetchMovies = async () => {
      if (type === 'filme') {
        try {
          const movieDetail = await fetch(`${apiURL}/movie/${id}?api_key=${apiKey}&language=pt-BR&page=1&include_image_language=pt&append_to_response=videos`);
          const data = await movieDetail.json();
          setMoviesDetails(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }else{
        try {
          const movieDetail = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR&page=1&include_image_language=pt&append_to_response=videos`);
          const data = await movieDetail.json();
          setMoviesDetails(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchMovies();
  },[id]);
  
  return autorizado ?(
    <main className='player-container'>
      <div className="div-menu" id={btnAtivo}>
          <ul>
            <li><button><CgClose onClick={btnClick} className="close-icon"/></button></li>
            <li><p id="" onClick={btnNavigate}>Inicio</p></li>
            <li><p id="Filmes" onClick={btnNavigate}>Filmes</p></li>
            <li><p id="Series" onClick={btnNavigate}>Series</p></li>
            <li><p onClick={hideBarSearch}>Pesquisar</p></li>
            <li><p id="Perfil" onClick={btnNavigate}>Conta</p></li>
          </ul>
      </div>

      <Search onValueChange={HandleHideChange} hide={hideBar}/>

      <header ref={headerContainer} id="player-header">
        <div ref={AppRef} className='opacity-div'></div>
        <div className="header-links">
            <div className='links-content'>
              <div id="btn-filmes-series" className="link-icons">
                <button onClick={btnClick} className="btn-menu">|||</button>
                <a id="" onClick={btnNavigate} className='btn-header'>Home</a>
                <a id="Filmes" className='btn-header' onClick={btnNavigate}>Filmes</a>
              </div>

              <div className="links-titulo">
                <h1>MovieZilla</h1>
              </div>

              <div className='link-icons'>
                <LuSearch onClick={hideBarSearch} className='lupa-icon'/>
                <div className="button-header-div">
                  <button id="Perfil" onClick={btnNavigate}>C</button>
                  <h3 id="Perfil" onClick={btnNavigate}>Conta</h3>
                </div>
              </div>

            </div>
        </div>

        <section className='player-movies'>
          <div id="player-background"></div>
          <div className="player_container_info">
              <div id="img-box">
                { moviesDetails.poster_path !== null ? (
                    <img src={`${imgUrl}${moviesDetails.poster_path}`}/>
                ):(
                    <img src={`${imgUrl}${moviesDetails.backdrop_path}`}/>
                )}
              </div>
              <div id="details-box">

                <div>
                  <h1>{moviesDetails.title ? (
                    moviesDetails.title
                  ):(
                    moviesDetails.name
                  )}  <span>({handleReleaseDate(moviesDetails.release_date)})</span></h1>
                  <div id="release_date">
                    <div id="date_info">
                      <span className="decoration-icon">{moviesDetails.release_date}</span>
                      <div className="decoration-icon" id="runtime">
                        {handleRunTime(moviesDetails.runtime).map((time, index) => (
                            index === 0 ?(
                              <span>{time}h</span>
                            ):(
                              <span>{time}m</span>
                            )
                        ))}
                      </div>
                      {handleGenres(moviesDetails.genres).map(genre => (
                      <span className="decoration-icon">{genre}</span>
                      ))}
                    </div>
                  </div>

                </div>

                <div id="vote_average">
                  <h3>Classificação Geral do Fans</h3>
                  <div id="count">{moviesDetails.vote_average.toFixed(0)}0 <span>%</span></div>
                </div>

                <div id='overview-box'>
                  <h2>Sinopse</h2>
                  <p>{moviesDetails.overview ? (
                    moviesDetails.overview
                  ): (
                    'Informação do filme/serie indisponivel neste momento. Recarregue a pagina novamente'
                  )}</p>
                </div>

                <div id="btn-video-box">
                  <button>Assistir Trailer</button>
                </div>
              </div>
          </div>
          <section className="player_img_box">
                <section className="player_img_container">
                  { moviesDetails.backdrop_path !== null ? (
                    <img src={`${imgUrl}${moviesDetails.backdrop_path}`}/>
                  ) : (
                    <img src={`${imgUrl}${moviesDetails.poster_path}`}/>
                  )}
                </section>
                <div id={playerAtivo} className='player-video'>
                  <div id="player-end"></div>
                  {moviesDetails.videos.results.length !== 0 ? (
                    <iframe
                    src={`https://www.youtube.com/embed/${moviesDetails.videos.results[0].key}`}
                    frameBorder="0"
                    allow=" autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  ) : (
                    <div className='iframe-error'>
                      <h1>Desculpe</h1>
                      <h2>Video indisponivel</h2>
                    </div>
                  )}
                  <div className="fundoPlayer"></div>
                </div>
          </section>
        </section>

      </header>

      <section className='overview-section'>
        <hr></hr>
        <div className='overview-content'>
          {type === 'filme' ? (
            <h1>Sobre o filme</h1>
          ) : (
            <h1>Sobre a Serie</h1>
          )}

          {moviesDetails.overview ? (
            <p>{moviesDetails.overview}</p>
          ):(
            <p>Descrição indisponivel</p>
          )}
        </div>
      </section>

      <Footer/>
    </main>
  ) : null
}

export default PlayerPage;