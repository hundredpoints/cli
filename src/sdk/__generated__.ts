import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The GlobalIdInput scalar type represents the global id. */
  GlobalId: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** ISO Day of Week. Starting with Sunday=0, ending with Saturday=6 */
  IsoDayOfWeek: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
};

export type ActivityEvent = Node & {
  __typename?: "ActivityEvent";
  id: Scalars["GlobalId"];
  startDateTime: Scalars["DateTime"];
  endDateTime: Scalars["DateTime"];
  url: Scalars["String"];
  source?: Maybe<Integration>;
};

export type AuthenticatedUser = {
  id: Scalars["GlobalId"];
};

export type BillingSubscription = Node & {
  __typename?: "BillingSubscription";
  id: Scalars["GlobalId"];
  status: BillingSubscriptionStatus;
  quantity: Scalars["Int"];
  cancelAtPeriodEnd: Scalars["Boolean"];
  currentPeriodStart: Scalars["DateTime"];
  currentPeriodEnd: Scalars["DateTime"];
  endedAt?: Maybe<Scalars["DateTime"]>;
  cancelAt?: Maybe<Scalars["DateTime"]>;
  canceledAt?: Maybe<Scalars["DateTime"]>;
  trialStart?: Maybe<Scalars["DateTime"]>;
  trialEnd?: Maybe<Scalars["DateTime"]>;
  price: Price;
};

export enum BillingSubscriptionStatus {
  Trialing = "TRIALING",
  Active = "ACTIVE",
  Canceled = "CANCELED",
  Incomplete = "INCOMPLETE",
  IncompleteExpired = "INCOMPLETE_EXPIRED",
  PastDue = "PAST_DUE",
  Unpaid = "UNPAID",
}

export type CreateActivityEventInputEvent = {
  startDateTime: Scalars["DateTime"];
  endDateTime?: Maybe<Scalars["DateTime"]>;
  integrationId?: Maybe<Scalars["GlobalId"]>;
  url: Scalars["String"];
  language?: Maybe<Scalars["String"]>;
  isWrite?: Maybe<Scalars["Boolean"]>;
  weight?: Maybe<Scalars["Int"]>;
};

export type CreateActivityEventPayload = MutationResponse & {
  __typename?: "CreateActivityEventPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
};

export type CreateActivityEventsInput = {
  events: Array<CreateActivityEventInputEvent>;
};

export type CreateActivityEventsPayload = MutationResponse & {
  __typename?: "CreateActivityEventsPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
};

export type CreateIntegrationInstallationInput = {
  name: Scalars["String"];
};

export type CreateIntegrationInstallationPayload = MutationResponse & {
  __typename?: "CreateIntegrationInstallationPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  installation?: Maybe<IntegrationInstallation>;
  token?: Maybe<Scalars["String"]>;
};

export type CreateProjectInput = {
  name: Scalars["String"];
  color: Scalars["HexColorCode"];
};

export type CreateProjectPayload = MutationResponse & {
  __typename?: "CreateProjectPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  project?: Maybe<Project>;
};

export type CreateProjectTaskInput = {
  name: Scalars["String"];
  priority?: Maybe<Scalars["Int"]>;
  projectId: Scalars["GlobalId"];
};

export type CreateProjectTaskPayload = MutationResponse & {
  __typename?: "CreateProjectTaskPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  projectTask?: Maybe<ProjectTask>;
};

export type CreateProjectTaskRuleInput = {
  projectTaskId: Scalars["GlobalId"];
  value?: Maybe<Scalars["String"]>;
  integrationIds?: Maybe<Array<Scalars["GlobalId"]>>;
  operation: ProjectTaskRuleOperation;
};

export type CreateProjectTaskRulePayload = MutationResponse & {
  __typename?: "CreateProjectTaskRulePayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  projectTaskRule?: Maybe<ProjectTaskRule>;
};

export type DeleteProjectInput = {
  id: Scalars["GlobalId"];
};

export type DeleteProjectPayload = MutationResponse & {
  __typename?: "DeleteProjectPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
};

export type DeleteProjectTaskInput = {
  id: Scalars["GlobalId"];
};

export type DeleteProjectTaskPayload = MutationResponse & {
  __typename?: "DeleteProjectTaskPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
};

export type DeleteProjectTaskRuleInput = {
  id: Scalars["GlobalId"];
};

export type DeleteProjectTaskRulePayload = MutationResponse & {
  __typename?: "DeleteProjectTaskRulePayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
};

export type Integration = {
  id: Scalars["GlobalId"];
  name: Scalars["String"];
  displayName: Scalars["String"];
  description: Scalars["String"];
  active: Scalars["Boolean"];
  installUri: Scalars["String"];
  installations: IntegrationInstallationConnection;
  overviewMarkdown: Scalars["String"];
  installationMarkdown: Scalars["String"];
};

export type IntegrationConnection = {
  __typename?: "IntegrationConnection";
  totalCount: Scalars["Int"];
  edges: Array<IntegrationEdge>;
  pageInfo: PageInfo;
};

export type IntegrationEdge = {
  __typename?: "IntegrationEdge";
  cursor: Scalars["Cursor"];
  node: Integration;
};

export type IntegrationInstallation = {
  id: Scalars["GlobalId"];
  installedBy: Profile;
  integration: Integration;
};

export type IntegrationInstallationConnection = {
  __typename?: "IntegrationInstallationConnection";
  totalCount: Scalars["Int"];
  edges: Array<IntegrationInstallationEdge>;
  pageInfo: PageInfo;
};

export type IntegrationInstallationEdge = {
  __typename?: "IntegrationInstallationEdge";
  cursor: Scalars["Cursor"];
  node: IntegrationInstallation;
};

export type ModifyTimesheetEntryInput = {
  id?: Maybe<Scalars["GlobalId"]>;
  projectTaskId?: Maybe<Scalars["GlobalId"]>;
  destroy?: Maybe<Scalars["Boolean"]>;
  startDateTime?: Maybe<Scalars["DateTime"]>;
  endDateTime?: Maybe<Scalars["DateTime"]>;
  isProjectOverride?: Maybe<Scalars["Boolean"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createActivityEvents: CreateActivityEventsPayload;
  createIntegrationInstallation: CreateIntegrationInstallationPayload;
  removeInstallationsForIntegration: RemoveInstallationsForIntegrationPayload;
  updateProfile: UpdateProfilePayload;
  createProject: CreateProjectPayload;
  deleteProject: DeleteProjectPayload;
  updateProject: UpdateProjectPayload;
  createProjectTask?: Maybe<CreateProjectTaskPayload>;
  updateProjectTask?: Maybe<UpdateProjectTaskPayload>;
  deleteProjectTask?: Maybe<DeleteProjectTaskPayload>;
  createProjectTaskRule: CreateProjectTaskRulePayload;
  updateProjectTaskRule: UpdateProjectTaskRulePayload;
  deleteProjectTaskRule: DeleteProjectTaskRulePayload;
  updateTimesheet: UpdateTimesheetPayload;
};

export type MutationCreateActivityEventsArgs = {
  input: CreateActivityEventsInput;
};

export type MutationCreateIntegrationInstallationArgs = {
  input: CreateIntegrationInstallationInput;
};

export type MutationRemoveInstallationsForIntegrationArgs = {
  input: RemoveInstallationsForIntegrationInput;
};

export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};

export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};

export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};

export type MutationCreateProjectTaskArgs = {
  input: CreateProjectTaskInput;
};

export type MutationUpdateProjectTaskArgs = {
  input: UpdateProjectTaskInput;
};

export type MutationDeleteProjectTaskArgs = {
  input: DeleteProjectTaskInput;
};

export type MutationCreateProjectTaskRuleArgs = {
  input: CreateProjectTaskRuleInput;
};

export type MutationUpdateProjectTaskRuleArgs = {
  input: UpdateProjectTaskRuleInput;
};

export type MutationDeleteProjectTaskRuleArgs = {
  input: DeleteProjectTaskRuleInput;
};

export type MutationUpdateTimesheetArgs = {
  input: Array<UpdateTimesheetDayInput>;
};

/** Standard mutation response format */
export type MutationResponse = {
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
};

export type Node = {
  id: Scalars["GlobalId"];
};

export type Organization = {
  __typename?: "Organization";
  id: Scalars["GlobalId"];
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  profileCount: Scalars["Int"];
  projects: ProjectConnection;
};

export enum OrganizationType {
  Personal = "PERSONAL",
}

/** Information to aid in pagination. */
export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  endCursor?: Maybe<Scalars["Cursor"]>;
  startCursor?: Maybe<Scalars["Cursor"]>;
};

export type PlatformEvent = Node & {
  __typename?: "PlatformEvent";
  id: Scalars["GlobalId"];
  type: PlatformEventType;
  description: Scalars["String"];
  createdAt: Scalars["DateTime"];
};

export type PlatformEventConnection = {
  __typename?: "PlatformEventConnection";
  pageInfo: PageInfo;
  edges: Array<PlatformEventEdge>;
  totalCount: Scalars["Int"];
};

export type PlatformEventEdge = {
  __typename?: "PlatformEventEdge";
  node: PlatformEvent;
  cursor: Scalars["Cursor"];
};

export enum PlatformEventType {
  ProfileCreate = "PROFILE__CREATE",
}

export type Price = Node & {
  __typename?: "Price";
  id: Scalars["GlobalId"];
  active: Scalars["Boolean"];
  description?: Maybe<Scalars["String"]>;
  unitAmount: Scalars["Int"];
  currency: Scalars["String"];
  type: PricingType;
  interval?: Maybe<PricingInterval>;
  intervalCount?: Maybe<Scalars["Int"]>;
  trialPeriodDays: Scalars["Int"];
  product: Product;
};

export type PriceConnection = {
  __typename?: "PriceConnection";
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
  edges: Array<PriceEdge>;
};

export type PriceEdge = {
  __typename?: "PriceEdge";
  cursor: Scalars["Cursor"];
  node: Price;
};

export enum PricingInterval {
  Day = "DAY",
  Week = "WEEK",
  Month = "MONTH",
  Year = "YEAR",
}

export enum PricingType {
  OneTime = "ONE_TIME",
  Recurring = "RECURRING",
}

export type Product = Node & {
  __typename?: "Product";
  id: Scalars["GlobalId"];
  name: Scalars["String"];
  active: Scalars["Boolean"];
  description: Scalars["String"];
  tagLine: Scalars["String"];
  markdownDescription: Scalars["String"];
  hasTeams: Scalars["Boolean"];
  unitLabel?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  prices: PriceConnection;
};

export type ProductPricesArgs = {
  after?: Maybe<Scalars["Cursor"]>;
  before?: Maybe<Scalars["Cursor"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  order?: Maybe<Array<Scalars["String"]>>;
};

export type ProductConnection = {
  __typename?: "ProductConnection";
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
  edges: Array<ProductEdge>;
};

export type ProductEdge = {
  __typename?: "ProductEdge";
  cursor: Scalars["Cursor"];
  node: Product;
};

export type Profile = {
  __typename?: "Profile";
  id: Scalars["GlobalId"];
  name: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  organization: Organization;
  preferences: ProfilePreferences;
};

export type ProfilePreferences = {
  __typename?: "ProfilePreferences";
  startOfWeek: Scalars["IsoDayOfWeek"];
};

export type Project = Node & {
  __typename?: "Project";
  id: Scalars["GlobalId"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  color: Scalars["HexColorCode"];
  organization: Organization;
  isDefault: Scalars["Boolean"];
  /** Returns a connection to ProjectTasks */
  tasks: ProjectTaskConnection;
};

export type ProjectTasksArgs = {
  after?: Maybe<Scalars["Cursor"]>;
  before?: Maybe<Scalars["Cursor"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  order?: Maybe<Array<ProjectTaskConnectionOrder>>;
};

export type ProjectConnection = {
  __typename?: "ProjectConnection";
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
  edges: Array<ProjectEdge>;
};

export type ProjectConnectionFilter = {
  textSearch?: Maybe<Scalars["String"]>;
};

export type ProjectEdge = {
  __typename?: "ProjectEdge";
  cursor: Scalars["Cursor"];
  node: Project;
};

export type ProjectTask = Node & {
  __typename?: "ProjectTask";
  id: Scalars["GlobalId"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  isDefault: Scalars["Boolean"];
  priority: Scalars["Int"];
  project: Project;
  rules: Array<ProjectTaskRule>;
};

export type ProjectTaskConnection = {
  __typename?: "ProjectTaskConnection";
  pageInfo: PageInfo;
  totalCount: Scalars["Int"];
  edges: Array<ProjectTaskEdge>;
};

export enum ProjectTaskConnectionOrder {
  Priority = "PRIORITY",
  PriorityDesc = "PRIORITY__DESC",
}

export type ProjectTaskEdge = {
  __typename?: "ProjectTaskEdge";
  cursor: Scalars["Cursor"];
  node: ProjectTask;
};

export type ProjectTaskRule = Node & {
  __typename?: "ProjectTaskRule";
  id: Scalars["GlobalId"];
  value?: Maybe<Scalars["String"]>;
  operation: ProjectTaskRuleOperation;
  integrations: Array<Integration>;
  task: ProjectTask;
};

export enum ProjectTaskRuleOperation {
  RemoteEquals = "REMOTE_EQUALS",
  HostnameEquals = "HOSTNAME_EQUALS",
  HostnameEqualsAndPathEquals = "HOSTNAME_EQUALS_AND_PATH_EQUALS",
}

export type Query = {
  __typename?: "Query";
  integrations: IntegrationConnection;
  integration?: Maybe<Integration>;
  node?: Maybe<Node>;
  organization: Organization;
  dashboardPlatformEvents: PlatformEventConnection;
  products: ProductConnection;
  product?: Maybe<Product>;
  profile: Profile;
  project?: Maybe<Project>;
  projects: ProjectConnection;
  getTimesheet: Array<Timesheet>;
  me: AuthenticatedUser;
};

export type QueryIntegrationsArgs = {
  installed?: Maybe<Scalars["Boolean"]>;
};

export type QueryIntegrationArgs = {
  id?: Maybe<Scalars["GlobalId"]>;
  name?: Maybe<Scalars["String"]>;
};

export type QueryNodeArgs = {
  id: Scalars["GlobalId"];
};

export type QueryProductArgs = {
  id: Scalars["GlobalId"];
};

export type QueryProjectArgs = {
  id: Scalars["GlobalId"];
};

export type QueryProjectsArgs = {
  after?: Maybe<Scalars["Cursor"]>;
  before?: Maybe<Scalars["Cursor"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  filter?: Maybe<ProjectConnectionFilter>;
  order?: Maybe<Array<Scalars["String"]>>;
};

export type QueryGetTimesheetArgs = {
  date: Scalars["Date"];
  period: TimesheetPeriod;
};

export type RemoveInstallationsForIntegrationInput = {
  id: Scalars["GlobalId"];
};

export type RemoveInstallationsForIntegrationPayload = MutationResponse & {
  __typename?: "RemoveInstallationsForIntegrationPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  count: Scalars["Int"];
};

export type Timesheet = Node & {
  __typename?: "Timesheet";
  id: Scalars["GlobalId"];
  date: Scalars["Date"];
  entries: Array<TimesheetEntry>;
};

export type TimesheetEntry = Node & {
  __typename?: "TimesheetEntry";
  id: Scalars["GlobalId"];
  startDateTime: Scalars["DateTime"];
  endDateTime: Scalars["DateTime"];
  projectTask: ProjectTask;
  project: Project;
  isManualEntry: Scalars["Boolean"];
  isProjectOverride: Scalars["Boolean"];
};

export enum TimesheetPeriod {
  Day = "DAY",
  Week = "WEEK",
}

export type UpdateProfileInput = {
  name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};

export type UpdateProfilePayload = MutationResponse & {
  __typename?: "UpdateProfilePayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  profile?: Maybe<Profile>;
};

export type UpdateProjectInput = {
  id: Scalars["GlobalId"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  color?: Maybe<Scalars["HexColorCode"]>;
};

export type UpdateProjectPayload = MutationResponse & {
  __typename?: "UpdateProjectPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  project?: Maybe<Project>;
};

export type UpdateProjectTaskInput = {
  id: Scalars["GlobalId"];
  name?: Maybe<Scalars["String"]>;
  isDefault?: Maybe<Scalars["Boolean"]>;
  priority?: Maybe<Scalars["Int"]>;
};

export type UpdateProjectTaskPayload = MutationResponse & {
  __typename?: "UpdateProjectTaskPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  projectTask?: Maybe<ProjectTask>;
};

export type UpdateProjectTaskRuleInput = {
  id: Scalars["GlobalId"];
  value?: Maybe<Scalars["String"]>;
  integrationIds?: Maybe<Array<Scalars["GlobalId"]>>;
  operation?: Maybe<ProjectTaskRuleOperation>;
};

export type UpdateProjectTaskRulePayload = MutationResponse & {
  __typename?: "UpdateProjectTaskRulePayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  projectTaskRule?: Maybe<ProjectTaskRule>;
};

export type UpdateTimesheetDayInput = {
  date: Scalars["Date"];
  entries: Array<ModifyTimesheetEntryInput>;
};

export type UpdateTimesheetPayload = MutationResponse & {
  __typename?: "UpdateTimesheetPayload";
  code: Scalars["String"];
  error: Scalars["Boolean"];
  message: Scalars["String"];
  timesheets: Array<Maybe<Timesheet>>;
};

export type User = Node &
  AuthenticatedUser & {
    __typename?: "User";
    id: Scalars["GlobalId"];
    profile: Profile;
    profiles: Array<Profile>;
  };

export type VimInstallation = IntegrationInstallation &
  AuthenticatedUser & {
    __typename?: "VimInstallation";
    id: Scalars["GlobalId"];
    installedBy: Profile;
    integration: Integration;
  };

export type VimIntegration = Integration & {
  __typename?: "VimIntegration";
  id: Scalars["GlobalId"];
  name: Scalars["String"];
  displayName: Scalars["String"];
  description: Scalars["String"];
  active: Scalars["Boolean"];
  preview: Scalars["Boolean"];
  installUri: Scalars["String"];
  installations: IntegrationInstallationConnection;
  overviewMarkdown: Scalars["String"];
  installationMarkdown: Scalars["String"];
};

export type VisualStudioCodeInstallation = IntegrationInstallation &
  AuthenticatedUser & {
    __typename?: "VisualStudioCodeInstallation";
    id: Scalars["GlobalId"];
    installedBy: Profile;
    integration: Integration;
  };

export type VisualStudioCodeIntegration = Integration & {
  __typename?: "VisualStudioCodeIntegration";
  id: Scalars["GlobalId"];
  name: Scalars["String"];
  displayName: Scalars["String"];
  description: Scalars["String"];
  active: Scalars["Boolean"];
  preview: Scalars["Boolean"];
  installUri: Scalars["String"];
  installations: IntegrationInstallationConnection;
  overviewMarkdown: Scalars["String"];
  installationMarkdown: Scalars["String"];
};

export type CreateActivityEventsMutationVariables = Exact<{
  input: CreateActivityEventsInput;
}>;

export type CreateActivityEventsMutation = { __typename?: "Mutation" } & {
  createActivityEvents: { __typename?: "CreateActivityEventsPayload" } & Pick<
    CreateActivityEventsPayload,
    "code" | "error" | "message"
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me:
    | ({ __typename?: "User" } & Pick<User, "id"> & {
          profile: { __typename?: "Profile" } & Pick<Profile, "id" | "name">;
        })
    | ({ __typename?: "VimInstallation" } & Pick<VimInstallation, "id"> & {
          installedBy: { __typename?: "Profile" } & Pick<
            Profile,
            "id" | "name"
          >;
          integration:
            | ({ __typename?: "VimIntegration" } & Pick<VimIntegration, "name">)
            | ({ __typename?: "VisualStudioCodeIntegration" } & Pick<
                VisualStudioCodeIntegration,
                "name"
              >);
        })
    | ({ __typename?: "VisualStudioCodeInstallation" } & Pick<
        VisualStudioCodeInstallation,
        "id"
      > & {
          installedBy: { __typename?: "Profile" } & Pick<
            Profile,
            "id" | "name"
          >;
          integration:
            | ({ __typename?: "VimIntegration" } & Pick<VimIntegration, "name">)
            | ({ __typename?: "VisualStudioCodeIntegration" } & Pick<
                VisualStudioCodeIntegration,
                "name"
              >);
        });
};

export const CreateActivityEventsDocument = gql`
  mutation createActivityEvents($input: CreateActivityEventsInput!) {
    createActivityEvents(input: $input) {
      code
      error
      message
    }
  }
`;
export const MeDocument = gql`
  query me {
    me {
      id
      ... on User {
        profile {
          id
          name
        }
      }
      ... on IntegrationInstallation {
        installedBy {
          id
          name
        }
        integration {
          name
        }
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    createActivityEvents(
      variables: CreateActivityEventsMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<CreateActivityEventsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateActivityEventsMutation>(
            CreateActivityEventsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "createActivityEvents"
      );
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<MeQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MeQuery>(MeDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "me"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
