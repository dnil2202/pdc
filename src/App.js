import Main from './Pages/Main';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()
console.log(queryClient)

function App() {
  return (
    <QueryClientProvider client={queryClient} >
        <Main/>
    </QueryClientProvider>
  );
}

export default App;
