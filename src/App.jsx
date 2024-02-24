import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/Pizza-block';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
  return (
    <>
      <Header />
      <div class="wrapper">
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">
              <PizzaBlock />
              <PizzaBlock />
              <PizzaBlock />
              <PizzaBlock />
              <PizzaBlock />
              <PizzaBlock />
              <PizzaBlock />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
