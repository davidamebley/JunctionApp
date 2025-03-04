import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { sortBy } from 'lodash-es'
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItemText,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ProjectsTable from 'components/tables/ProjectsTable'
import ChallengeLink from './ChallengeLink'

import * as OrganiserSelectors from 'redux/organiser/selectors'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const teams = useSelector(OrganiserSelectors.teams)

    const getProjectsForChallenge = slug => {
        const projectsWithTeam = projects
            .map(project => {
                const teamFound = teams.find(team => {
                    return team._id === project.team
                })
                if (teamFound) {
                    project.teamCode = teamFound.code
                } else {
                    project.teamCode = 'No team'
                }
                return project
            })
            .filter(project => project.teamCode !== 'No team')
        return projectsWithTeam.filter(project => {
            return project.challenges && project.challenges.indexOf(slug) !== -1
        })
    }

    const challenges = useMemo(() => {
        return sortBy(event.challenges, 'name')
    }, [event.challenges])
    return (
        <Box>
            {challenges.map(challenge => {
                const projects = getProjectsForChallenge(challenge.slug)
                return (
                    <Accordion key={challenge.slug}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemText
                                primary={challenge.name}
                                secondary={`${challenge.partner} // ${projects.length} projects`}
                            ></ListItemText>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                display="flex"
                                flexDirection="column"
                                style={{ width: '100%' }}
                            >
                                <Box p={1}>
                                    <ChallengeLink challenge={challenge.slug} />
                                </Box>
                                <ProjectsTable projects={projects} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Box>
    )
}
