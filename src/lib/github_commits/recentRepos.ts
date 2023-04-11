const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

const query = `
    query {
        viewer {
            repositories(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
                nodes {
                    name
                    url
                }
            }
        }
    }
`;

const isRecentRepositoriesResponse = (data: any): data is RecentRepositoriesResponse => {
    return (
        data &&
        data.viewer &&
        data.viewer.repositories &&
        Array.isArray(data.viewer.repositories.nodes)
    );
};


export const loadRepositories = async (gitToken: string): Promise<RepositoryNode[]> => {
    const response = await fetch(GITHUB_GRAPHQL_API, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${gitToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    if (!isRecentRepositoriesResponse(responseData.data)) {
        throw new Error('Invalid GraphQL response');
    }

    const repositoryNodes = responseData.data.viewer.repositories.nodes;

    return repositoryNodes;
};
