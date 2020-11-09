import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageNotFound from "@/common/components/PageNotFound";
import { Skeleton, Spin } from "antd";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const Loading = () => <Spin delay={100} tip="Loading" />;

const EmptySkeleton = () => {
  return <Skeleton active={true} avatar={true} />;
};

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/microapp1" component={EmptySkeleton} />
        <Route exact path="/microapp2" component={EmptySkeleton} />
        <Route exact path="/microapp3" component={EmptySkeleton} />
        <Route exact path="/nested-menu/nested1" component={EmptySkeleton} />
        <Route exact path="/nested-menu/nested2" component={EmptySkeleton} />
        <Redirect exact from="/" to="/microapp1" />
        <Route component={PageNotFound} />
      </Switch>
    </Suspense>
  );
}

export default React.memo(Router);
