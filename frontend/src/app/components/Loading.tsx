// frontend/src/components/Loading.tsx
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]}`} />
  );
}

export function LoadingPage({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-text-secondary text-lg">{message}</p>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-card-dark border border-border-color animate-pulse">
      <div className="aspect-video bg-surface-dark" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface-dark rounded w-3/4" />
        <div className="h-4 bg-surface-dark rounded w-full" />
        <div className="h-4 bg-surface-dark rounded w-5/6" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-surface-dark rounded w-20" />
          <div className="h-8 bg-surface-dark rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}

// frontend/src/components/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
  retry?: () => void;
  type?: 'error' | 'warning' | 'info';
}

export function ErrorMessage({ message, retry, type = 'error' }: ErrorMessageProps) {
  const colors = {
    error: 'bg-red-500/10 border-red-500/50 text-red-400',
    warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400',
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
  };

  const icons = {
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[type]}`}>
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-2xl">
          {icons[type]}
        </span>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {retry && (
            <button
              onClick={retry}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ErrorPage({ 
  message = 'Something went wrong',
  retry 
}: { 
  message?: string;
  retry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <span className="material-symbols-outlined text-6xl text-red-400">
        error
      </span>
      <p className="text-text-main text-xl font-bold">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-bold transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// frontend/src/components/EmptyState.tsx
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon = 'inbox', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center px-4">
      <span className="material-symbols-outlined text-7xl text-text-dark-secondary">
        {icon}
      </span>
      <h3 className="text-text-main text-xl font-bold">{title}</h3>
      {description && (
        <p className="text-text-secondary max-w-md">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-bold transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}