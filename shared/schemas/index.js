const { GraphQLSchema, printSchema } = require('graphql')

const Address = require('./Address')
const Answers = require('./Answers')
const Challenge = require('./Challenge')
const Hackerpack = require('./Hackerpack')
const CloudinaryImage = require('./CloudinaryImage')
const Education = require('./Education')
const EventTag = require('./EventTag')
const EventRecruiters = require('./Recruiter')
const IBANAccount = require('./IBANAccount')
const LegalName = require('./LegalName')
const PhoneNumber = require('./PhoneNumber')
const MongoFile = require('./MongoFile')
const RecruitmentOptions = require('./RecruitmentOptions')
const RegistrationConfig = require('./RegistrationConfig')
const RegistrationQuestion = require('./RegistrationQuestion')
const RegistrationQuestionSettings = require('./RegistrationQuestionSettings')
const RegistrationSection = require('./RegistrationSection')
const RecruiterEvents = require('./RecruiterEvents')
const Role = require('./Role')
const Skill = require('./Skill')
const TeamOptions = require('./TeamOptions')
const Track = require('./Track')
const TravelGrantConfig = require('./TravelGrantConfig')
const TravelGrantDetails = require('./TravelGrantDetails')
const UserDetailsConfig = require('./UserDetailsConfig')
const UserDetailsConfigItem = require('./UserDetailsConfigItem')
const UserProfileFields = require('./UserProfileFields')
const Webhook = require('./Webhook')
const EventTheme = require('./EventTheme')
const EventTimeline = require('./EventTimeline')
const Checklist = require('./Checklist')
const MeetingRoom = require('./MeetingRoom')
const EventPageScript = require('./EventPageScript')
const SubmissionDefaultFields = require('./SubmissionDefaultFields')
const ScoreCriteriaSettings = require('./ScoreCriteriaSettings')
const Certificate = require('./Certificate')
// const GraphQLSchema = makeExecutableSchema

const SharedSchema = new GraphQLSchema({
    types: [
        Address.graphql,
        Address.graphqlInput,
        Answers.graphql,
        Challenge.graphql,
        Challenge.graphqlInput,
        Hackerpack.graphql,
        Hackerpack.graphqlInput,
        CloudinaryImage.graphql,
        CloudinaryImage.graphqlInput,
        Education.graphql,
        EventTag.graphql,
        EventTag.graphqlInput,
        EventRecruiters.graphql,
        EventRecruiters.graphqlInput,
        IBANAccount.graphql,
        LegalName.graphql,
        PhoneNumber.graphql,
        MongoFile.graphql,
        MongoFile.graphqlInput,
        RecruitmentOptions.graphql,
        RegistrationConfig.graphql,
        RegistrationConfig.graphqlInput,
        RegistrationQuestion.graphql,
        RegistrationQuestionSettings.graphql,
        RegistrationSection.graphql,
        RegistrationSection.graphqlInput,
        RecruiterEvents.graphql,
        RecruiterEvents.graphqlInput,
        Role.graphql,
        Skill.graphql,
        TeamOptions.graphql,
        Track.graphql,
        Track.graphqlInput,
        TravelGrantConfig.graphql,
        TravelGrantConfig.graphqlInput,
        TravelGrantDetails.graphql,
        UserDetailsConfig.graphql,
        UserDetailsConfigItem.graphql,
        UserProfileFields.graphql,
        Webhook.graphql,
        Webhook.graphqlInput,
        EventTheme.graphql,
        EventTheme.graphqlInput,
        EventTimeline.graphql,
        EventTimeline.itemInput,
        EventTimeline.graphqlInput,
        Checklist.graphql,
        Checklist.itemInput,
        Checklist.graphqlInput,
        MeetingRoom.graphql,
        MeetingRoom.graphqlInput,
        EventPageScript.graphql,
        SubmissionDefaultFields.graphql,
        SubmissionDefaultFields.graphqlInput,
        EventPageScript.graphqlInput,
        ScoreCriteriaSettings.graphql,
        ScoreCriteriaSettings.graphqlInput,
        Certificate.graphql,
        Certificate.graphqlInput,
    ],
})

module.exports = {
    SharedGraphQLTypes: printSchema(SharedSchema),
}
