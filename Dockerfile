# Use Node.js 18 Alpine for smaller image size
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Build TypeScript
RUN yarn build

# Remove dev dependencies to reduce image size
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

# Create uploads directory
RUN mkdir -p uploads

# Set default environment variables (can be overridden)
ENV NODE_ENV=production

# Expose port (uses PORT env var from environment)
EXPOSE ${PORT:-3333}

# Start the application
CMD ["yarn", "start"]
