import React, { useState, useEffect, Suspense } from 'react'

import { ConnectedRouter, push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ApolloProvider } from '@apollo/client'

import { Route, Redirect, Switch } from 'react-router-dom'
import routeConfig from './routes'
import apolloClient from './graphql/client'
import config from 'constants/config'
import * as AuthSelectors from 'redux/auth/selectors'
import * as AuthActions from 'redux/auth/actions'
import AnalyticsService from 'services/analytics'
import { getCookieConsentValue } from 'react-cookie-consent'
import CookieConsentBar from 'components/layouts/CookieConsentBar'
import * as SnackbarActions from 'redux/snackbar/actions'

export default ({ history, location }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const isSessionExpired = useSelector(AuthSelectors.isSessionExpired)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (getCookieConsentValue() === 'true') {
            AnalyticsService.init()
            AnalyticsService.pageView(window.location) // Initial page view tracking
            const unlisten = history.listen(AnalyticsService.pageView) // Listen for route changes
            return () => {
                unlisten() // Cleanup listener on component unmount
            }
        }
    }, [location, history])

    useEffect(() => {
        setLoading(false)
        if (isAuthenticated && isSessionExpired) {
            setLoading(true)
            console.log('renewing session now')
            try {
                dispatch(AuthActions.renewSession())
            } catch (err) {
                console.log(err)
                dispatch(SnackbarActions.error('Please, log in again'))
            } finally {
                setLoading(false)
            }
        }
    }, [dispatch, isAuthenticated, isSessionExpired])

    return (
        <ApolloProvider
            client={
                apolloClient(
                    idToken,
                ) /*TODO: fails to fetch when renewing session causing a loop. fix! */
            }
        >
            <ConnectedRouter history={history}>
                <Suspense fallback={null}>
                    {!loading && (
                        <Switch>
                            {routeConfig.routes.map(route => (
                                <Route key={route.path} {...route} />
                            ))}
                            {/**
                             * Miscellaneous
                             * TODO: 404 page
                             */}
                            <title>{config.PLATFORM_OWNER_NAME}</title>
                            <meta
                                name="keywords"
                                content="Hackathon, hackathon platform, Junction"
                            />
                            <meta
                                name="title"
                                content={config.SEO_PAGE_TITLE}
                            />
                            <meta
                                property="og:title"
                                content={config.SEO_PAGE_TITLE}
                            />

                            <meta
                                name="twitter:title"
                                content={config.SEO_PAGE_TITLE}
                            />
                            <meta
                                name="description"
                                content={config.SEO_PAGE_DESCRIPTION}
                            />
                            <meta
                                property="og:description"
                                content={config.SEO_PAGE_DESCRIPTION}
                            />
                            <meta
                                name="twitter:description"
                                content={config.SEO_PAGE_DESCRIPTION}
                            />

                            <meta name="og:type" content="website" />
                            <meta
                                property="og:image"
                                content={config.SEO_IMAGE_URL}
                            />
                            <meta
                                name="twitter:image"
                                content={config.SEO_IMAGE_URL}
                            />
                            <meta property="og:image:width" content="1200" />
                            <meta property="og:image:height" content="630" />
                            <meta
                                name="twitter:card"
                                content="summary_large_image"
                            />
                            <meta
                                name="twitter:site"
                                content={config.SEO_TWITTER_HANDLE}
                            />
                            <meta
                                name="twitter:creator"
                                content={config.SEO_TWITTER_HANDLE}
                            />
                            <script
                                type="text/javascript"
                                async
                                src="https://platform.twitter.com/widgets.js"
                            ></script>
                            {/* {isAuthenticated ?
                                <Redirect to="/dashboard" /> :} */}
                            <Redirect to="/" />
                        </Switch>
                    )}
                </Suspense>
            </ConnectedRouter>
            <CookieConsentBar />
        </ApolloProvider>
    )
}
