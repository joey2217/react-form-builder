import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Skeleton } from 'antd'
import Home from './pages/home'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<Skeleton />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/f/:id"
              component={lazy(() => import('./pages/form'))}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
