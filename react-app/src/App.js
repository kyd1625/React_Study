import './App.css';
import {useState} from 'react'; // react에서 기본 제공 함수

function Header(props) {
  
  return <header>
    <h1><a href="/" onClick={(event)=>{ 
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
      </header>
}

function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/view/' + t.id} onClick={event=> {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }

  return <nav>
        <ol>
          {lis}
        </ol>
      </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
      </article>
}

function Item(props) {
  const itemList = [
    {keyCode:1000, category:1, item: '- JavaScript 기반의 라이브러리로 2013 FaceBook에서 개발하였다.'},
    {keyCode:2000, category:2, item: '- 사용자 정의 = 컴퍼넌트 = function'},
    {keyCode:2001, category:2, item: '- 사용자 정의 태그 첫 글자는 반드시 대문자 사용해야 된다.'},
    {keyCode:3000, category:3, item: '- 리액트는 프론트앤드 소스코드를 객채화 시켜 사용 할 수 있게 만든 언어 이며'},
    {keyCode:3001, category:3, item: '- 객채화 시킨 코드이므로 수정 및 유지보수에 용이하다.'}
  ]
  const item = []
  let keyCode = null;
  for (let i = 0; i < itemList.length; i++){
        if (itemList[i].category === props.num) {
        keyCode = itemList[i].keyCode;
        item.push(<p key={keyCode}> {itemList[i].item}</p>)
    }
  }

  return <div key={keyCode}>
    {item}
  </div>
}

function App() {
  //const _mode = useState('WELCOME');
  //const mode = _mode[0];
  //const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:'React.js란?', body:'React.js란?'},
    {id:2, title:'React 공부 정리', body:'React 공부 정리'},
    {id:3, title:'개인적인 생각', body:'개인적인 생각'}
  ]
  let content, item = null;
  if (mode === 'WELCOME') {
    content = <Article title="React" body="Hello, WEB"></Article>
  } else if (mode === 'READ') {
    let title, body, num = null;
    for (let i = 0; i < topics.length; i++){
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        num = id;
      }
    }


    content = <Article title={title} body={body} ></Article>
    item = <Item num={num}></Item>
  }
  return (
    <div>

      <Header title="React" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      
      {content}
      {item}
    </div>
  );
}


export default App;
