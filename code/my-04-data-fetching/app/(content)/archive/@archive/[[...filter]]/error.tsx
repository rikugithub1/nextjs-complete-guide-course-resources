'use client';

type FilterErrorProps = {
  error: Error & { digest?: string };
};

// necessary for parallel routing to catch any invalid paths
export default function FilterError({ error }: FilterErrorProps) {
  return (
    <div id='error'>
      <h2>An error occurred!</h2>
      <p>{error.message}</p>
    </div>
  );
}
